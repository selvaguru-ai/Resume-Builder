import { useState, useEffect, useCallback } from "react";

// Custom hook for Google authentication and user management
export const useAuth = (supabase) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Handle user data upsert to database
  const upsertUserData = useCallback(
    async (sessionUser) => {
      if (!sessionUser) return;

      const userData = {
        id: sessionUser.id,
        email: sessionUser.email,
        created_at: sessionUser.created_at,
        last_login: new Date().toISOString(),
      };

      try {
        const { error } = await supabase.from("users").upsert(userData, {
          onConflict: "id",
        });

        if (error) {
          console.error("❌ Upsert error:", error);
        } else {
          console.log("✅ Upsert success");
        }
      } catch (error) {
        console.error("❌ Database error:", error);
      }
    },
    [supabase],
  );

  // Handle Google Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google Sign-In error:", error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      alert(
        `Failed to sign in with Google: ${error.message}. Please try again.`,
      );
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [supabase]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    console.log("Inside handleLogout function");
    try {
      console.log("Error");
      console.log("Supabase instance:", supabase);
      // Force rehydration of session from storage (best workaround)
      const { error } = await supabase.auth.signOut();
      console.log(error);
      setUser(null);
      //console.log("Error:", error);
      if (error) {
        console.error("Logout error:", error);
        alert("Failed to logout. Please try again.");
        return false;
      } else {
        console.log("✅ User logged out successfully");
        setUser(null);
        return true;
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
      return false;
    }
  });

  // Check current authentication status
  const checkAuthStatus = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  }, [supabase]);

  // Set up auth state listener
  useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);

      if (event === "SIGNED_IN" && session?.user) {
        console.log("✅ User signed in:", session.user.email);
        await upsertUserData(session.user);
        setUser(session.user);
        setIsAuthenticating(false);
      }
      console.log("session user", session?.user || null);
      console.log("User event", event);
      if (event === "SIGNED_OUT") {
        console.log(event, "🚪 User signed out");
        setUser(null);
      }
    });

    // Check initial auth state
    const checkInitialAuth = async () => {
      const currentUser = await checkAuthStatus();
      if (currentUser) {
        setUser(currentUser);
      }
    };

    checkInitialAuth();

    return () => subscription.unsubscribe();
  }, [supabase, upsertUserData, checkAuthStatus]);

  return {
    user,
    setUser,
    isAuthenticating,
    setIsAuthenticating,
    handleGoogleSignIn,
    handleLogout,
    checkAuthStatus,
  };
};
