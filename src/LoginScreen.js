import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to control button disable
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and Password are required.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation Error", "Password should be at least 6 characters.");
      return;
    }

    console.log("Login successful");
  };

  // Use an effect to enable/disable the button based on validation
  useEffect(() => {
    if (emailError || passwordError || !email || !password) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          style={[styles.input, emailError && { borderColor: "#ff4c29", borderWidth: 2 }]}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError && { borderColor: "#ff4c29", borderWidth: 2 }]}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.button, isButtonDisabled && { backgroundColor: "#aaa" }]} // Disabled state styling
            onPress={handleLogin}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isButtonDisabled} // Disable the button if invalid
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e", // Dark background
  },
  card: {
    width: 350,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    backdropFilter: "blur(10px)", // Only works on web
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ff4c29",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#ff4c29",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#aaa",
    marginTop: 15,
  },
  errorText: {
    color: "#ff4c29",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default LoginScreen;
