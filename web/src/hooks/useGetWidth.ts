import { useEffect } from "react";

interface Props {
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
}

export function useGetWidth({ setWindowWidth }: Props) {
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);
}
