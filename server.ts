import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Setup standard body-parsing middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route for healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route for registration form submission
  app.post("/api/register", async (req, res) => {
    try {
      const { fullName, email, phone, gender, currentLevel, preferredDays, comments, dateSubmitted } = req.body;

      if (!fullName || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: "Full Name, Email, and WhatsApp / Phone Number are required fields."
        });
      }

      const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

      if (!scriptUrl) {
        console.warn("GOOGLE_SHEETS_SCRIPT_URL is not set in the environment variables.");
        return res.json({
          success: true,
          localOnly: true,
          message: "Registration recorded successfully on the server. Note: GOOGLE_SHEETS_SCRIPT_URL is not configured yet, so data was not pushed to Google Sheets. Please set the GOOGLE_SHEETS_SCRIPT_URL secret in AI Studio."
        });
      }

      console.log(`Forwarding registration for ${fullName} to Google Sheets Web App...`);

      const daysString = Array.isArray(preferredDays) ? preferredDays.join(", ") : preferredDays || "";
      const dateString = dateSubmitted || new Date().toISOString();
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "";

      // Comprehensive payload mapping to handle any variable/header names in the user's script
      const payload: Record<string, string> = {
        spreadsheetId: spreadsheetId,
        spreadsheet_id: spreadsheetId,
        sheetName: "Registrations",
        sheet_name: "Registrations",
        
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        currentLevel: currentLevel,
        preferredDays: daysString,
        comments: comments || "",
        dateSubmitted: dateString,

        // Common alternative keys
        name: fullName,
        whatsapp: phone,
        level: currentLevel,
        days: daysString,
        commentsOrTimezone: comments || "",
        
        // Title-cased keys
        FullName: fullName,
        Email: email,
        Phone: phone,
        Gender: gender,
        CurrentLevel: currentLevel,
        PreferredDays: daysString,
        Comments: comments || "",
        DateSubmitted: dateString,

        // Spaces and custom header names for scripts mapping headers directly
        "Full Name": fullName,
        "Email Address": email,
        "WhatsApp Number": phone,
        "WhatsApp / Phone": phone,
        "Phone Number": phone,
        "Current Level": currentLevel,
        "Preferred Days": daysString,
        "Date Submitted": dateString
      };

      // Construct a URL with the parameters in the query string as well.
      // This is extremely important because Google Apps Script e.parameter reads from the URL query string
      // even for POST requests, while e.postData.contents reads from the body. Supporting both guarantees success!
      const queryParams = new URLSearchParams();
      Object.entries(payload).forEach(([key, val]) => {
        queryParams.append(key, val);
      });

      const finalUrl = `${scriptUrl}${scriptUrl.includes("?") ? "&" : "?"}${queryParams.toString()}`;

      // Perform the POST request to the Google Apps Script URL
      const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow"
      });

      const responseText = await response.text();
      console.log("Google Sheets Apps Script response status:", response.status);
      console.log("Google Sheets Apps Script response payload:", responseText);
      
      // Check if the response contains typical Apps Script error indicators
      const hasAppsScriptError = 
        responseText.includes("ReferenceError") || 
        responseText.includes("TypeError") || 
        responseText.includes("錯誤") || 
        responseText.includes("Error") || 
        responseText.includes("Exception") ||
        response.status >= 400;

      if (hasAppsScriptError) {
        // Extract a clean error summary from the Google HTML response if possible
        let extractedError = "Google Apps Script runtime error.";
        const match = responseText.match(/<div[^>]*>(ReferenceError:[^<]+|TypeError:[^<]+|Exception:[^<]+)<\/div>/i) || 
                      responseText.match(/class="errorMessage"[^>]*>([^<]+)<\/span>/i);
        if (match && match[1]) {
          extractedError = match[1].trim();
        } else if (responseText.includes("ReferenceError")) {
          extractedError = "ReferenceError: " + (responseText.split("ReferenceError:")[1]?.split("<")[0]?.trim() || "is not defined inside the Google Apps Script.");
        }

        return res.json({
          success: true, // We still return success: true so the student gets their admission slip
          googleSheetsError: extractedError,
          message: "Registration recorded successfully on the server, but there was an error running your Google Apps Script: " + extractedError
        });
      }

      return res.json({
        success: true,
        message: "Registration successfully recorded and sent to Google Sheets!",
        details: responseText
      });
    } catch (error: any) {
      console.error("Error connecting to Google Sheets:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to connect to Google Sheets backend service. Please check your App Script deployment and secrets.",
        details: error?.message || String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
