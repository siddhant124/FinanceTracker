/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {addTransactionCategory} from '../../redux/action';
import {RootState} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryScreen() {
  const [categoryName, setCategoryName] = useState('');
  const categories = useSelector((state: RootState) => state.reducer); // Access categories from Redux state
  const dispatch = useDispatch();

  // Handle adding category and saving to AsyncStorage
  const handleAddTransCategory = async () => {
    if (categoryName.trim()) {
      dispatch(addTransactionCategory(categoryName.trim()));
      await saveCategoryToStorage(categoryName.trim());
      setCategoryName('');
    } else {
      console.warn('Please add category');
    }
  };

  // Save newly added categories to AsyncStorage
  const saveCategoryToStorage = async (newCategory: string) => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      const parsedCategories = storedCategories
        ? JSON.parse(storedCategories)
        : [];
      parsedCategories.push(newCategory);
      await AsyncStorage.setItem(
        'categories',
        JSON.stringify(parsedCategories),
      );
    } catch (error) {
      console.log('Error saving categories:', error);
    }
  };

  // Load categories from AsyncStorage on component mount
  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        const newCategories = parsedCategories.filter(
          (category: string) => !categories.includes(category),
        ); // Only add categories not already in state
        newCategories.forEach((category: string) => {
          dispatch(addTransactionCategory(category));
        });
      }
    } catch (error) {
      console.log('Error loading categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Memoize the renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryText}>{item}</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Categories</Text>

        <TextInput
          placeholder="Category name"
          onChangeText={setCategoryName}
          value={categoryName}
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={categoryName.trim() ? 0.6 : 1}
          onPress={handleAddTransCategory}
          style={[
            styles.addButton,
            {backgroundColor: categoryName.trim() ? '#000' : '#808080'},
          ]}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

        <Text style={styles.listTitle}>Category List</Text>
        <FlatList
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 10,
            flexWrap: 'wrap',
          }}
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No categories available</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addButton: {
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    padding: 10,
  },
  listTitle: {
    fontSize: 14,
    marginTop: 24,
    color: 'black',
    fontWeight: 'semibold',
    marginBottom: 14,
  },
  categoryItem: {
    backgroundColor: '#D3E3F8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 12,
    borderRadius: 10000,
    borderWidth: 1,
    borderColor: '#003380',
  },
  categoryText: {
    color: '#003380',
    fontSize: 12,
    lineHeight: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});
