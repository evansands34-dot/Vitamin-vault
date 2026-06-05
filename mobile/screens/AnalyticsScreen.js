import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, SegmentedButtons, LineChart } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const AnalyticsScreen = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const [analyticsData, setAnalyticsData] = useState({
    totalScheduled: 0,
    totalTaken: 0,
    totalSkipped: 0,
    totalMissed: 0,
    consistencyScore: 0,
    chartData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Fetch analytics from API based on timeRange
      setLoading(false);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [70, 85, 75, 90, 65, 80, 88],
        color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Time Range Selector */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="labelMedium">View</Text>
            <SegmentedButtons
              value={timeRange}
              onValueChange={setTimeRange}
              buttons={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </Card.Content>
        </Card>

        {/* Summary Stats */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">Summary</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="headlineMedium" style={styles.statValue}>
                  {analyticsData.totalTaken}
                </Text>
                <Text variant="bodySmall">Taken</Text>
              </View>
              <View style={styles.statItem}>
                <Text
                  variant="headlineMedium"
                  style={[styles.statValue, { color: '#FFA500' }]}
                >
                  {analyticsData.totalSkipped}
                </Text>
                <Text variant="bodySmall">Skipped</Text>
              </View>
              <View style={styles.statItem}>
                <Text
                  variant="headlineMedium"
                  style={[styles.statValue, { color: '#FF6B6B' }]}
                >
                  {analyticsData.totalMissed}
                </Text>
                <Text variant="bodySmall">Missed</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Consistency Score */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">Consistency Score</Text>
            <View style={styles.scoreContainer}>
              <Text variant="displayLarge">
                {analyticsData.consistencyScore}%
              </Text>
              <Text variant="bodySmall">Keep up the great work!</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Chart */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">Compliance Trend</Text>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 48}
              height={220}
              yAxisLabel="%"
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Top Vitamins */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">Top Vitamins</Text>
            {[
              { name: 'Vitamin D', compliance: 95 },
              { name: 'Omega-3', compliance: 88 },
              { name: 'Multivitamin', compliance: 82 },
            ].map((vitamin, index) => (
              <View key={index} style={styles.vitaminRow}>
                <Text variant="bodyMedium">{vitamin.name}</Text>
                <Text variant="bodyMedium">{vitamin.compliance}%</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Export Button */}
        <Button mode="contained" style={styles.exportButton}>
          Export Report (PDF)
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#6200EE',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  vitaminRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  exportButton: {
    marginTop: 16,
    marginBottom: 80,
  },
});

export default AnalyticsScreen;
