import { useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { useRouter } from "next/navigation";
import React from "react";

function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }, [isAuthenticated, router]);

    if (!user?.id) {
      return <p>Cargando...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
}

export default withAuth;
