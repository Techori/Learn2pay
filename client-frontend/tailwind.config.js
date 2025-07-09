/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: 'var(--background-color)',
        surface: 'var(--surface-color)',
        'text-primary': 'var(--text-color)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border-color)',

        // Brand colors
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      backgroundColor: {
        // Component backgrounds
        card: 'var(--card-bg)',
        input: 'var(--input-bg)',
        tab: 'var(--tab-bg)',
        'tab-active': 'var(--tab-active)',
        'tab-hover': 'var(--tab-hover)',
        sidebar: 'var(--sidebar-bg)',
        header: 'var(--header-bg)',
        dropdown: 'var(--dropdown-bg)',
        modal: 'var(--modal-bg)',
        'table-header': 'var(--table-header-bg)',
        'table-row-hover': 'var(--table-row-hover)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
        card: 'var(--card-border)',
        input: 'var(--input-border)',
      },
      textColor: {
        DEFAULT: 'var(--text-color)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
}
