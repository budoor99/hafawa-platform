// ============================== Imports ==============================
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// ============================== Styles ==============================
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A148C",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    color: "#555",
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: "47%", // allows two cards per row with spacing
    padding: 10,
    border: "1 solid #ddd",
    borderRadius: 4,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

// ============================== Label Mapper ==============================
const formatLabel = (key) => {
  const map = {
    totalUsers: "Total Users",
    totalRegularUsers: "Regular Users",
    totalTourGuides: "Tour Guides",
    activeTourGuides: "Active Tour Guides",
    inactiveTourGuides: "Inactive Tour Guides",
    totalHosts: "Total Hosts",
    activeHosts: "Active Hosts",
    inactiveHosts: "Inactive Hosts",
    totalDestinations: "Destinations",
  };
  return map[key] || key;
};

// ============================== PDF Document Component ==============================
const DashboardPDFDocument = ({ stats }) => {
  const entries = Object.entries(stats);
  const rows = [];

  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }

  const now = new Date().toLocaleString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>📊 Hafawa Admin Report</Text>
        <Text style={styles.subHeader}>
          Here's an overview of the current platform statistics
        </Text>
        <Text style={styles.timestamp}>Generated on: {now}</Text>

        <View>
          {rows.map((pair, idx) => (
            <View key={idx} style={styles.row}>
              {pair.map(([key, value]) => (
                <View key={key} style={styles.card}>
                  <Text style={styles.cardTitle}>{formatLabel(key)}</Text>
                  <Text style={styles.cardValue}>{value}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default DashboardPDFDocument;
