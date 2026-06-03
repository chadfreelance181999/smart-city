import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import {
  DepartmentReportsModel,
  DepartmentsModel,
  ReportMetricsModel,
} from "@/app/generated/prisma/models";

interface ReportsWithMetrics extends DepartmentReportsModel {
  metrics: ReportMetricsModel[];
}

interface DepartmentsWithReports extends DepartmentsModel {
  reports: ReportsWithMetrics[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  headings: {
    fontSize: 20,
    textAlign: "center",
  },
  documentTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    marginHorizontal: 20,
    padding: 10,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
});

// Create Document Component
const DocumentPreview = ({
  departments,
}: {
  departments: DepartmentsWithReports[];
}) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.section}>
        <Image
          src="https://smart-city-staging.netlify.app/Binan%20Laguna.jpg"
          style={{ width: 50, height: 50, marginBottom: 10, position: "absolute", left: 50, top: 50, zIndex: 1000 }}
          minPresenceAhead={1000}
          alt="City of Biñan Logo"
        />
        <Text style={styles.headings}>Republic of the Philippines</Text>
        <Text style={styles.headings}>Province of Laguna</Text>
        <Text style={styles.headings}>City of Biñan</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.documentTitle}>Mayor's Weekly Briefer</Text>

        {departments.map((department) => (
          <View key={department.id} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>
              {department.title}
            </Text>
            {department.reports.map((report) => (
              <View key={report.id} style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>
                  {report.title}
                </Text>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>
                  {report.description}
                </Text>

                <Text style={{ fontSize: 10, marginBottom: 5 }}>
                  Metrics:
                </Text>

                {report.metrics.map((metric) => (
                  <Text
                    key={metric.id}
                    style={{ fontSize: 10, marginLeft: 10}}
                  >
                    {metric.name}: {metric.value}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default DocumentPreview;
