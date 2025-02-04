import { StylesConfig } from "react-select";

export const getSelectStyles = (selectType: "async" | "sync" = "sync"):StylesConfig<unknown> => {
  return {
    control: (provided, _) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: "#d1d5db", 
      borderRadius: "0.375rem",
      padding: "4px 10px",  // Padding adjusted for 40px height
      outline: "none",
      height: "40px",  // Set height to 40px
      minHeight: "40px",  // Ensure minHeight is 40px
      display: "flex",  // Flexbox for alignment
      alignItems: "center",  // Vertically center the elements
      justifyContent: "space-between",  // Ensure space is distributed
      overflow: "hidden",  // Prevent overflow
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--secondary-500)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
      zIndex: 9999,
      overflowY: "auto",  // Enable vertical scroll if content overflows
      maxHeight: "250px",  // Limit the menu height
      padding: "0",  // Remove padding inside the menu
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      zIndex: 100000,
      overflowY: "auto",  // Enable scrolling in the menu list
      maxHeight: "230px",  // Adjust max height for list items
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "var(--secondary-100)" : (
        state.isFocused ? "#EDEDED" : "transparent"
      ),
      color: "#000", 
      padding: "8px 12px",  // Adjust padding for the options
      cursor: "pointer",
      "&:active": {
        backgroundColor: "var(--secondary-50)", 
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af", 
      fontSize: "0.875rem",
      position: "absolute",  // Position placeholder absolutely
      top: "50%",  // Vertically center it
      right: "10px",  // Right-align the placeholder
      transform: "translateY(-50%)",  // Keep it vertically centered
      pointerEvents: "none",  // Prevent interaction with the placeholder
      height: "30px"
    }),
    input: (provided) => ({
      ...provided,
      transform: selectType === "async" ? "translateY(-50%)" : "translateY(0%)",  // Keep it vertically centered
      top: "50%",  // Vertically center it
      height:"30px"
    }),
    valueContainer: (provided) => ({
      ...provided,
      height:"30px",
      transform: selectType === "async" ? "translateY(-45%)" : "translateY(-70%)",  // Keep it vertically centered
      top: "50%",  
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1f2937", 
      fontSize: "0.875rem",
      top: "50%",  
      transform: selectType === "async" ? "translateY(-25%)" : "translateY(20%)",  // Keep it vertically centered
    }),
    indicatorSeparator: () => ({
      display: "none", 
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "var(--secondary-500)" : "#9ca3af",
      "&:hover": {
        color: "#000",
      },
    }),
  };
  
}