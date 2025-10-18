// src/theme.js
export const theme = {
  colors: {
    primary: "#3498db",   // الأزرق
    secondary: "#2ecc71", // الأخضر
    background: "#ffffff", // الخلفية العادية
    navBackground: "#f8f9fa", // خلفية الـ Navbar
    text: "#333333" // لون النصوص
  }
  
};
export const lightTheme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#ffffff",
    navBackground: "#f8f9fa",
    text: "#333333",
    linkUnderline: "linear-gradient(90deg, #3498db, #2ecc71)",
    iconColor: "#444",
    iconHover: "#2ecc71",
    badgeBackground: "#e74c3c",
    badgeText: "#fff",
    searchBorder: "#ddd",
    searchBackground: "#f8f9fa",
    searchFocus: "#3498db"
  },
  animations: {
    gradientFlow: "8s ease infinite",
    float3D: "6s ease-in-out infinite"
  }
};

export const darkTheme = {
  colors: {
    primary: "#2980b9",
    secondary: "#27ae60",
    background: "#121212",
    navBackground: "#1e1e1e",
    text: "#f5f5f5",
    linkUnderline: "linear-gradient(90deg, #2980b9, #27ae60)",
    iconColor: "#ddd",
    iconHover: "#27ae60",
    badgeBackground: "#ff4757",
    badgeText: "#fff",
    searchBorder: "#333",
    searchBackground: "#1e1e2d",
    searchFocus: "#2980b9"
  },
  animations: {
    gradientFlow: "8s ease infinite",
    float3D: "6s ease-in-out infinite"
  }
};
