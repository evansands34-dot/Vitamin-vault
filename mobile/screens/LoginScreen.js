import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      // TODO: Call login API
      // const response = await api.post('/auth/login', {
      //   email,
      //   password,
      // });
      
      // await AsyncStorage.setItem('userToken', response.data.token);
      // await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      
      setLoading(false);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <Text variant="displayLarge" style={styles.logo}>
            💊
          </Text>
          <Text variant="headlineMedium" style={styles.title}>
            VitaTrack
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Your Health Companion
          </Text>
        </View>

        {/* Login Form */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.formTitle}>
              Welcome Back
            </Text>

            {error && (
              <Text variant="bodySmall" style={styles.errorText}>
                {error}
              </Text>
            )}

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              editable={!loading}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              mode="outlined"
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off' : 'eye'}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              style={styles.input}
              editable={!loading}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
            >
              Log In
            </Button>

            <Button
              mode="text"
              onPress={() => {
                // TODO: Navigate to forgot password
              }}
              style={styles.forgotButton}
            >
              Forgot Password?
            </Button>
          </Card.Content>
        </Card>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text variant="bodyMedium">Don't have an account? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Signup')}
            compact
          >
            Sign Up
          </Button>
        </View>
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
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#999',
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  formTitle: {
    marginBottom: 16,
    color: '#6200EE',
  },
  input: {
    marginBottom: 12,
  },
  loginButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  forgotButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
});

export default LoginScreen;
