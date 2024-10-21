/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {addCategory} from '../../redux/transactionsSlice';
import {RootState} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryScreen() {
  const [categoryName, setCategoryName] = useState('');
  const categories = useSelector(
    (state: RootState) => state.transactions.categories,
  );
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (categoryName !== '') {
      dispatch(addCategory(categoryName));
      setCategoryName('');
    } else {
      console.warn('Please add category');
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('categories');

        if (storedCategories !== null) {
          const parsedCategories = JSON.parse(storedCategories);

          parsedCategories.forEach((category: string) => {
            dispatch(addCategory(category));
          });
        }
      } catch (error) {
        console.log('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          padding: 24,
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Add Categories
        </Text>
        <TextInput
          placeholder="Category name"
          onChangeText={text => {
            setCategoryName(text);
          }}
          value={categoryName}
          inputMode="text"
          keyboardType="default"
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#999',
            borderRadius: 9,
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}
        />

        <TouchableOpacity
          activeOpacity={categoryName !== '' ? 0.6 : 1}
          onPress={() => {
            if (categoryName !== '') {
              handleAddCategory();
            } else {
              console.warn('Please add category');
            }
          }}
          style={{
            backgroundColor: categoryName !== '' ? '#000' : '#808080',
            borderRadius: 10,
            marginTop: 10,
            alignSelf: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: '#FFF',
              textAlign: 'center',
              padding: 10,
            }}>
            Add
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 14,
            marginTop: 24,
            color: 'black',
            fontWeight: 'semibold',
            marginBottom: 14,
          }}>
          Category List
        </Text>
        <FlatList
          data={categories}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          renderItem={({item}) => (
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No categories available</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: '#f0f0f0', // Light grey background
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd', // Border around each item
  },
  categoryText: {
    fontSize: 18,
    color: '#333', // Dark grey text
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999', // Light grey text for empty message
    marginTop: 20,
  },
});
