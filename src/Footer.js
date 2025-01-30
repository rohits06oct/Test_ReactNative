import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Image } from "react-native";

const Footer = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
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
              <TouchableOpacity key={i} onPress={() => Linking.openURL(link.url)}>
                <Text style={styles.footerLink}>{link.name}</Text>
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
    </ScrollView>
  );
};

// Footer data sections
const footerData = [
  {
    title: "Need Help?",
    links: [
      { name: "Member Login", url: "http://localhost:3000/registration/user/login" },
      { name: "Sign Up", url: "https://www.shaadi.com/sign-up" },
      { name: "Partner Search", url: "https://www.shaadi.com/partner-search" },
      { name: "How to Use Shaadi.com", url: "https://www.shaadi.com/how-to-use" },
      { name: "Premium Memberships", url: "https://www.shaadi.com/premium-memberships" },
      { name: "Customer Support", url: "https://www.shaadi.com/customer-support" },
      { name: "Site Map", url: "https://www.shaadi.com/site-map" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", url: "https://www.shaadi.com/about" },
      { name: "Shaadi Blog", url: "https://www.shaadi.com/blog" },
      { name: "Careers", url: "https://www.shaadi.com/careers" },
      { name: "Awards & Recognition", url: "https://www.shaadi.com/awards" },
      { name: "Cov-Aid", url: "https://www.shaadi.com/cov-aid" },
      { name: "Contact Us", url: "https://www.shaadi.com/contact" },
    ],
  },
  {
    title: "Privacy & You",
    links: [
      { name: "Terms of Use", url: "https://www.shaadi.com/terms-of-use" },
      { name: "Privacy Policy", url: "https://www.shaadi.com/privacy-policy" },
      { name: "Be Safe Online", url: "https://www.shaadi.com/safety" },
      { name: "Report Misuse", url: "https://www.shaadi.com/report-misuse" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "VIP Shaadi", url: "https://www.shaadi.com/vip-shaadi" },
      { name: "Select Shaadi", url: "https://www.shaadi.com/select-shaadi" },
      { name: "Sangam", url: "https://www.shaadi.com/sangam" },
      { name: "Shaadi Centres", url: "https://www.shaadi.com/shaadi-centres" },
      { name: "Success Stories", url: "https://www.shaadi.com/success-stories" },
      { name: "Shaadi Live", url: "https://www.shaadi.com/shaadi-live" },
      { name: "Elite Matrimony by Shaadi.com", url: "https://www.shaadi.com/elite-matrimony" },
      { name: "Astrochat.com", url: "https://www.astrochat.com" },
      { name: "Chat with Astrologers", url: "https://www.shaadi.com/chat-with-astrologers" },
    ],
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
  scrollContainer: {
    flex: 1,
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
