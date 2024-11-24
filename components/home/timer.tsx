import React from "react";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NumberCard from "@/components/home/number_cards";

function Timer({ startDate, onTimerFinished }: any) {
  const targetTime = new Date(startDate).getTime();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const timeBetween = useMemo(() => targetTime - currentTime, [
    currentTime,
    targetTime
  ]);

  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeBetween % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeBetween % (1000 * 60)) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeBetween <= 0) {
        clearInterval(interval);
        onTimerFinished();
      } else {
        setCurrentTime(Date.now());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeBetween, onTimerFinished]);

  return (
    <View style={styles.container}>
      <NumberCard number={days} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={hours} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={minutes} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={seconds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "center"
  },
  colorDivider: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Timer;
