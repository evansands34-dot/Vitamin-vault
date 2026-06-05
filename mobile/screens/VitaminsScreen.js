import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, FAB, Searchbar, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const VitaminsScreen = () => {
  const navigation = useNavigation();
  const [vitamins, setVitamins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Vitamins', 'Minerals', 'Supplements', 'Medications'];

  useEffect(() => {
    loadVitamins();
  }, []);

  const loadVitamins = async () => {
    try {
      setLoading(true);
      // TODO: Fetch vitamins from API
      setLoading(false);
    } catch (error) {
      console.error('Error loading vitamins:', error);
      setLoading(false);
    }
  };

  const handleDeleteVitamin = async (vitaminId) => {
    try {
      // TODO: Call delete API
      setVitamins(vitamins.filter(v => v.id !== vitaminId));
    } catch (error) {
      console.error('Error deleting vitamin:', error);
    }
  };

  const filteredVitamins = vitamins.filter(vitamin =>
    (selectedCategory === 'All' || vitamin.category === selectedCategory) &&
    vitamin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Search vitamins..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories.map(category => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.chip}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>

        {/* Vitamins List */}
        {filteredVitamins.length > 0 ? (
          filteredVitamins.map(vitamin => (
            <Card key={vitamin.id} style={styles.card}>
              <Card.Content>
                <View style={styles.vitaminHeader}>
                  <View style={styles.vitaminInfo}>
                    <Text variant="headlineSmall">{vitamin.name}</Text>
                    <Text variant="bodySmall">{vitamin.dosage}</Text>
                    <Text variant="bodySmall">{vitamin.frequency}</Text>
                  </View>
                  <View
                    style={[
                      styles.colorIndicator,
                      { backgroundColor: vitamin.colorCode || '#6200EE' },
                    ]}
                  />
                </View>
                <View style={styles.actionButtons}>
                  <Button
                    mode="outlined"
                    size="small"
                    onPress={() =>
                      navigation.navigate('Vitamins', {
                        screen: 'EditVitamin',
                        params: { vitaminId: vitamin.id },
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    mode="outlined"
                    size="small"
                    onPress={() => handleDeleteVitamin(vitamin.id)}
                    textColor="#d32f2f"
                  >
                    Delete
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No vitamins found. Tap the + button to add one!
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      {/* FAB for adding vitamin */}
      <FAB
        icon="plus"
        label="Add Vitamin"
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
  searchbar: {
    marginBottom: 16,
    borderRadius: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
  },
  vitaminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vitaminInfo: {
    flex: 1,
  },
  colorIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});

export default VitaminsScreen;
