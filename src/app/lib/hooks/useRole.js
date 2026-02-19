'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useRole = () => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await fetch(`/api/users/role`);
        const data = await res.json();
        setRole(data?.role);
      } catch (err) {
        console.error("useRole error:", err);
        setRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [status]);

  return { role, loading };
};

export default useRole;
