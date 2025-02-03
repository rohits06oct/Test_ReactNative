import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Alert,
  Animated,
} from "react-native";

const SignUpScreen = () => {
  const [profileFor, setProfileFor] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [community, setCommunity] = useState("");
  const [religion, setReligion] = useState("");

  const [email, setEmail] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [country, setCountry] = useState("");

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Step 1 Validation
  const validateStep1 = () => {
    let newErrors = {};
    if (!profileFor) newErrors.profileFor = "Select profile type.";
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!religion) newErrors.religion = "Religion is required.";
    if (!community) newErrors.community = "Enter your community.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    let newErrors = {};
    if (!email || !validateEmail(email)) newErrors.email = "Enter a valid email.";
    if (!dobDay || !dobMonth || !dobYear) newErrors.dob = "Date of birth is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSignup = () => {
    if (validateStep2()) {
      Alert.alert("Success", "Your account has been created!");
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <View style={styles.card}>
          <Text style={styles.title}>Create an Account</Text>

          <Text style={styles.label}>Profile for</Text>
          <Picker
            selectedValue={profileFor}
            style={styles.input}
            onValueChange={(itemValue) => setProfileFor(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Self" value="Self" />
            <Picker.Item label="Parent" value="Parent" />
            <Picker.Item label="Friend" value="Friend" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {errors.profileFor && <Text style={styles.errorText}>{errors.profileFor}</Text>}

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Middle Name"
              value={middleName}
              onChangeText={setMiddleName}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <Text style={styles.label}>Religion</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your religion"
            value={religion}
            onChangeText={setReligion}
          />
          {errors.religion && <Text style={styles.errorText}>{errors.religion}</Text>}

          <Text style={styles.label}>Community / Language</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter community"
            value={community}
            onChangeText={setCommunity}
          />
          {errors.community && <Text style={styles.errorText}>{errors.community}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Basic Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.thirdInput]}
              placeholder="Day"
              keyboardType="numeric"
              value={dobDay}
              onChangeText={setDobDay}
            />
            <TextInput
              style={[styles.input, styles.thirdInput]}
              placeholder="Month"
              keyboardType="numeric"
              value={dobMonth}
              onChangeText={setDobMonth}
            />
            <TextInput
              style={[styles.input, styles.thirdInput]}
              placeholder="Year"
              keyboardType="numeric"
              value={dobYear}
              onChangeText={setDobYear}
            />
          </View>
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F0FE",
  },
  card: {
    width: 350,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F9FAFC",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default SignUpScreen;
