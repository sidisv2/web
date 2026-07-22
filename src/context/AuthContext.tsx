diff --git a/src/context/AuthContext.tsx b/src/context/AuthContext.tsx
index a96efd9..0000000
--- a/src/context/AuthContext.tsx
+++ b/src/context/AuthContext.tsx
@@
-import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
+import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
@@
-import AuthModal from '../components/auth/AuthModal';
+import AuthModal from '../components/auth/AuthModal';
@@
   return (
-    <AuthContext.Provider
-      value={{
-        user,
-        session,
-        loading,
-        userPreferences,
-        authModalOpen,
-        modalTab,
-        pendingPlan,
-        pendingRoute,
-        signUp,
-        signIn,
-        signInWithGoogle,
-        signOut,
-        updateUserProfile,
-        updateUserPreferences,
-        requireAuthForPayment,
-        openAuthModal,
-        closeAuthModal,
-      }}
-    >
-      {children}
-    </AuthContext.Provider>
+    <AuthContext.Provider
+      value={{
+        user,
+        session,
+        loading,
+        userPreferences,
+        authModalOpen,
+        modalTab,
+        pendingPlan,
+        pendingRoute,
+        signUp,
+        signIn,
+        signInWithGoogle,
+        signOut,
+        updateUserProfile,
+        updateUserPreferences,
+        requireAuthForPayment,
+        openAuthModal,
+        closeAuthModal,
+      }}
+    >
+      {/* Render the Auth modal at the provider level so any component can open it via context */}
+      <AuthModal
+        isOpen={authModalOpen}
+        onClose={closeAuthModal}
+        onAuthSuccess={() => {
+          // After successful auth, execute any pending actions
+          try {
+            handlePostAuthAction();
+          } catch (e) {
+            console.warn('Error handling post auth action', e);
+          }
+        }}
+        initialTab={modalTab}
+      />
+
+      {children}
+    </AuthContext.Provider>
   );
 };
