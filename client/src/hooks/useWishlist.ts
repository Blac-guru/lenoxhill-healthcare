import { useCallback, useEffect, useState } from "react";

type WishlistListener = (ids: string[]) => void;

const STORAGE_KEY = "lenoxhill.wishlist";
const listeners = new Set<WishlistListener>();

const readWishlist = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
};

const writeWishlist = (ids: string[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  listeners.forEach((listener) => listener(ids));
};

export const useWishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readWishlist(),
  );

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setWishlistIds(readWishlist());
    };

    const handleBroadcast: WishlistListener = (ids) => {
      setWishlistIds(ids);
    };

    listeners.add(handleBroadcast);
    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(handleBroadcast);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const add = useCallback((productId: string) => {
    setWishlistIds((current) => {
      if (current.includes(productId)) {
        return current;
      }

      const next = [...current, productId];
      writeWishlist(next);
      return next;
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setWishlistIds((current) => {
      const next = current.filter((id) => id !== productId);
      writeWishlist(next);
      return next;
    });
  }, []);

  const toggle = useCallback((productId: string) => {
    setWishlistIds((current) => {
      const next = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];
      writeWishlist(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  return {
    wishlistIds,
    add,
    remove,
    toggle,
    isWishlisted,
  };
};
