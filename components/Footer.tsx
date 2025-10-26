"use client";

import FeatherIcon from "feather-icons-react";
import React, { useState, useEffect } from "react";

export default function Contact() {
  const [visitorLocation, setVisitorLocation] = useState<string>("");

  useEffect(() => {
    // Country code to full name mapping
    const countryNames: { [key: string]: string } = {
      SI: "Slovenia",
      US: "United States",
      GB: "United Kingdom",
      DE: "Germany",
      FR: "France",
      IT: "Italy",
      ES: "Spain",
      NL: "Netherlands",
      CA: "Canada",
      AU: "Australia",
      JP: "Japan",
      CN: "China",
      IN: "India",
      BR: "Brazil",
      MX: "Mexico",
      AR: "Argentina",
      ZA: "South Africa",
      EG: "Egypt",
      NG: "Nigeria",
      KE: "Kenya",
      RU: "Russia",
      TR: "Turkey",
      SE: "Sweden",
      NO: "Norway",
      DK: "Denmark",
      FI: "Finland",
      CH: "Switzerland",
      AT: "Austria",
      BE: "Belgium",
      PT: "Portugal",
      GR: "Greece",
      PL: "Poland",
      CZ: "Czech Republic",
      HU: "Hungary",
      RO: "Romania",
      BG: "Bulgaria",
      HR: "Croatia",
      RS: "Serbia",
      BA: "Bosnia and Herzegovina",
      ME: "Montenegro",
      MK: "North Macedonia",
      AL: "Albania",
      XK: "Kosovo",
      SK: "Slovakia",
      LT: "Lithuania",
      LV: "Latvia",
      EE: "Estonia",
      IE: "Ireland",
      IS: "Iceland",
      MT: "Malta",
      CY: "Cyprus",
      LU: "Luxembourg",
      MC: "Monaco",
      LI: "Liechtenstein",
      AD: "Andorra",
      SM: "San Marino",
      VA: "Vatican City",
    };

    const fetchVisitorLocation = async () => {
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.city && data.country) {
          const countryName = countryNames[data.country] || data.country;
          setVisitorLocation(`${data.city}, ${countryName}`);
        } else if (data.country) {
          const countryName = countryNames[data.country] || data.country;
          setVisitorLocation(countryName);
        }
      } catch (error) {
        // Silently fail - this is just a nice-to-have feature
        console.log("Could not fetch location:", error);
      }
    };

    // Only fetch on client side
    if (typeof window !== "undefined") {
      fetchVisitorLocation();
    }
  }, []);

  return (
    <section id="contact" className="pt-14 sm:pt-20 pb-6 px-5" style={{ 
      position: 'relative',
      backgroundImage: 'url(/photos/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#FB461F'
    }}>
      <div className="max-w-screen-sm mx-auto">
        <h2 className="text-sm font-bold text-white mb-2">
          let&apos;s get in touch
        </h2>

        <div className="flex items-center space-x-6">
          <a
            href="https://substack.com/@kajaskerlj"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-decoration-underline text-white hover:text-black transition-colors duration-200 group underline"
          >
            <span className="text-white group-hover:text-black underline duration-200">
              blog
            </span>
            <FeatherIcon icon="arrow-up-right" size="16" strokeWidth={1} />
          </a>
          <a
            href="mailto:kaja.skerlj@gmail.com"
            className="flex items-center space-x-1 text-sm text-decoration-underline text-white hover:text-black transition-colors duration-200 group underline"
          >
            <span className="text-white group-hover:text-black underline duration-200">
              email
            </span>
            <FeatherIcon icon="arrow-up-right" size="16" strokeWidth={1} />
          </a>

          <a
            href="https://www.linkedin.com/in/kajaskerlj/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-decoration-underline text-white hover:text-black transition-colors duration-200 group underline"
          >
            <span className="text-white group-hover:text-black underline duration-200">
              linkedin
            </span>
            <FeatherIcon icon="arrow-up-right" size="16" strokeWidth={1} />
          </a>
        </div>
        <div className="mt-10 text-left">
          <p className="text-xs text-light-red">
            built with{" "}
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-red hover:text-black underline transition-colors duration-200"
            >
              next.js
            </a>{" "}
            by me
          </p>
          {visitorLocation && (
            <p className="text-xs text-light-red mt-1">
              last visitor from {visitorLocation}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}