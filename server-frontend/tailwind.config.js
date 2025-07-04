/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      colors: {
        // Core colors
        background: 'var(--background-color)',
        surface: 'var(--surface-color)',
        text: {
          DEFAULT: 'var(--text-color)',
          secondary: 'var(--text-secondary)'
        },
        border: 'var(--border-color)',
        
        // Brand colors
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        
        // UI colors
        secondary: "var(--secondary)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        
        // Component colors
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)"
        },
        input: {
          bg: "var(--input-bg)",
          border: "var(--input-border)",
          text: "var(--input-text)"
        },
        button: {
          text: "var(--button-text)"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
        card: "var(--shadow)",
      },
      backgroundColor: {
        card: "var(--card-bg)"
      },
      textColor: {
        primary: "var(--text-color)",
        secondary: "var(--text-secondary)"
      },
      borderColor: {
        DEFAULT: "var(--border-color)"
      }
    },
  },
  plugins: [],
};
