import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Instagram, Mail, Sparkles } from "lucide-react-native";
import * as Haptics from "expo-haptics";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ComingSoonScreen() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for the gem icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Shimmer effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setIsSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a1a", "#0a0a0a"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Gem Icon */}
              <Animated.View
                style={[
                  styles.gemContainer,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <View style={styles.gemOuter}>
                  <Sparkles size={32} color="#B8860B" />
                </View>
              </Animated.View>

              {/* Brand Name */}
              <Animated.View
                style={{
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                }}
              >
                <Text style={styles.brandName}>ALLURE</Text>
                <Text style={styles.brandNameSub}>DU CHIC</Text>
              </Animated.View>

              {/* Tagline */}
              <View style={styles.divider} />
              <Text style={styles.tagline}>BESPOKE LUXURY</Text>
              <Text style={styles.taglineSmall}>Made to Order • Made for You</Text>

              {/* Coming Soon Message */}
              <View style={styles.comingSoonContainer}>
                <Text style={styles.comingSoon}>COMING SOON</Text>
                <Text style={styles.description}>
                  An exclusive collection of made-to-order luxury pieces,
                  crafted for the discerning few who appreciate true elegance.
                </Text>
              </View>

              {/* Email Signup */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupTitle}>Join Our VIP List</Text>
                <Text style={styles.signupSubtitle}>
                  Be the first to experience exclusive access
                </Text>
                
                {!isSubmitted ? (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#666"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmit}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.submitButtonText}>NOTIFY ME</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Animated.View style={styles.successMessage}>
                    <Text style={styles.successText}>
                      Welcome to the elite circle
                    </Text>
                  </Animated.View>
                )}
              </View>

              {/* Social Links */}
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                  <Instagram size={20} color="#B8860B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                  <Mail size={20} color="#B8860B" />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <Text style={styles.footer}>© 2025 Allure du Chic. All rights reserved.</Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  gemContainer: {
    marginBottom: 30,
  },
  gemOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(184, 134, 11, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(184, 134, 11, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 48,
    fontWeight: "200",
    letterSpacing: 12,
    color: "#B8860B",
    textAlign: "center",
    marginBottom: -5,
  },
  brandNameSub: {
    fontSize: 36,
    fontWeight: "200",
    letterSpacing: 8,
    color: "#B8860B",
    textAlign: "center",
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: "rgba(184, 134, 11, 0.3)",
    marginVertical: 20,
  },
  tagline: {
    fontSize: 14,
    letterSpacing: 4,
    color: "#999",
    marginBottom: 8,
  },
  taglineSmall: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#666",
    marginBottom: 40,
  },
  comingSoonContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: "300",
    letterSpacing: 6,
    color: "#fff",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#999",
    textAlign: "center",
    maxWidth: 300,
  },
  signupContainer: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    marginBottom: 40,
  },
  signupTitle: {
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 8,
  },
  signupSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(184, 134, 11, 0.2)",
    overflow: "hidden",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#B8860B",
    paddingVertical: 15,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#000",
  },
  successMessage: {
    paddingVertical: 20,
  },
  successText: {
    fontSize: 16,
    color: "#B8860B",
    fontStyle: "italic",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(184, 134, 11, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(184, 134, 11, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    fontSize: 10,
    color: "#444",
    letterSpacing: 1,
  },
});