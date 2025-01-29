import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Image } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      {/* Country Links */}
      <View style={styles.countryLinks}>
    {[
        { name: "India", url: "https://www.shaadi.com/india" },
        { name: "USA", url: "https://www.shaadi.com/usa" },
        { name: "Canada", url: "https://www.shaadi.com/canada" },
        { name: "UK", url: "https://www.shaadi.com/uk" },
        { name: "Singapore", url: "https://www.shaadi.com/singapore" },
        { name: "Australia", url: "https://www.shaadi.com/australia" },
        { name: "UAE", url: "https://www.shaadi.com/uae" },
        { name: "NRI Matrimonials", url: "https://www.shaadi.com/nri" }
    ].map((item, index) => (
        <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.countryText}>{item.name}</Text>
        </TouchableOpacity>
    ))}
    </View>

      {/* Trust Section */}
    <View style={styles.trustSection}>
        <Text style={styles.trustedText}>Trusted by Millions</Text>
        <View style={styles.trustItems}>
            {[
            { text: "Best Matches", icon: require("./assets/79462.png") },
            { text: "Verified Profiles", icon: require("./assets/verified90.webp") },
            { text: "100% Privacy", icon: require("./assets/4104800.png") }
            ].map((item, index) => (
            <View key={index} style={styles.trustItem}>
                <Image source={item.icon} style={styles.trustIcon} />
                <Text style={styles.trustItemText}>{item.text}</Text>
            </View>
            ))}
        </View>
    </View>

      {/* Footer Sections */}
      <View style={styles.footerLinks}>
        {footerData.map((section, index) => (
          <View key={index} style={styles.footerColumn}>
            <Text style={styles.footerHeading}>{section.title}</Text>
            {section.links.map((link, i) => (
              <TouchableOpacity key={i} onPress={() => Linking.openURL("#")}>
                <Text style={styles.footerLink}>{link}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Copyright */}
      <Text style={styles.copyright}>
        © 2025 marrige.com, The World's Leading Matchmaking Service™
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL("#")}>
        <Text style={styles.createdBy}>Passionately created by People Group ➤</Text>
      </TouchableOpacity>
    </View>
  );
};

// Footer data sections
const footerData = [
  {
    title: "Need Help?",
    links: ["Member Login", "Sign Up", "Partner Search", "How to Use Shaadi.com", "Premium Memberships", "Customer Support", "Site Map"],
  },
  {
    title: "Company",
    links: ["About Us", "Shaadi Blog", "Careers", "Awards & Recognition", "Cov-Aid", "Contact Us"],
  },
  {
    title: "Privacy & You",
    links: ["Terms of Use", "Privacy Policy", "Be Safe Online", "Report Misuse"],
  },
  {
    title: "More",
    links: ["VIP Shaadi", "Select Shaadi", "Sangam", "Shaadi Centres", "Success Stories", "Shaadi Live", "Elite Matrimony by Shaadi.com", "Astrochat.com", "Chat with Astrologers"],
  },
];

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  countryLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  trustIcon: {
    width: 35,  // Adjust as needed
    height: 35, // Adjust as needed
    marginRight: 8,
    resizeMode: "contain",
  },
  countryText: {
    color: "#0096ff",
    marginHorizontal: 5,
    fontSize: 14,
  },
  trustSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  trustedText: {
    backgroundColor: "#0096ff",
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
  trustItems: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  trustItem: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  trustItemText: {
    fontSize: 14,
    marginTop: 5,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 900,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  footerColumn: {
    width: "22%",
    minWidth: 150,
    alignItems: "center",
    marginBottom: 10,
  },
  footerHeading: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  footerLink: {
    color: "#666",
    fontSize: 14,
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  createdBy: {
    fontSize: 12,
    color: "#0096ff",
    textAlign: "center",
    marginTop: 5,
  },
});

export default Footer;
