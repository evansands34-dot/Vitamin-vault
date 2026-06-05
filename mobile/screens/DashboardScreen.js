import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, FAB, Badge, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [todaysDoses, setTodaysDoses] = useState([]);
  const [consistencyScore, setConsistencyScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch today's doses, consistency score, and streak
      // TODO: Integrate with API
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Consistency Score Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">Today's Consistency</Text>
            <View style={styles.consistencyContainer}>
              <ProgressBar
                progress={consistencyScore / 100}
                style={styles.progressBar}
              />
              <Text variant="displaySmall">{consistencyScore}%</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Streak Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">🔥 Current Streak</Text>
            <Text variant="displayMedium">{currentStreak} days</Text>
            <Text variant="bodySmall">Keep it up! You're doing great.</Text>
          </Card.Content>
        </Card>

        {/* Today's Vitamins */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Text variant="headlineSmall">Today's Doses</Text>
              <Badge style={styles.badge}>{todaysDoses.length}</Badge>
            </View>
            {todaysDoses.length > 0 ? (
              todaysDoses.map((dose) => (
                <View key={dose.id} style={styles.doseItem}>
                  <View>
                    <Text variant="bodyMedium">{dose.vitaminName}</Text>
                    <Text variant="bodySmall">{dose.dosage} • {dose.time}</Text>
                  </View>
                  <Button
                    mode="contained"
                    compact
                    onPress={() => handleDoseTaken(dose.id)}
                  >
                    Mark as Taken
                  </Button>
                </View>
              ))
            ) : (
              <Text variant="bodySmall">No doses scheduled for today</Text>
            )}
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">Quick Actions</Text>
            <View style={styles.actionsContainer}>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Vitamins', { screen: 'AddVitamin' })}
              >
                Add Vitamin
              </Button>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Analytics')}
              >
                View Analytics
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB for quick add */}
      <FAB
        icon="plus"
        label="Add Dose"
        style={styles.fab}
        onPress={() => navigation.navigate('Vitamins', { screen: 'AddVitamin' })}
      />
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
    marginBottom: 16,
    borderRadius: 8,
  },
  consistencyContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#6200EE',
  },
  doseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});

export default DashboardScreen;
