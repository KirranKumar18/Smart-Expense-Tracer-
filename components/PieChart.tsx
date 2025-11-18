import { colors } from '@/constants/colors';
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from '@/types/expense';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface PieChartData {
  category: Category;
  amount: number;
  percentage: number;
}

interface PieChartProps {
  data: PieChartData[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const size = 200;
  const strokeWidth = 30;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate segments
  let currentAngle = -90; // Start from top
  const segments = data.map((item) => {
    const segmentAngle = (item.percentage / 100) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + segmentAngle,
    };
    currentAngle += segmentAngle;
    return segment;
  });

  return (
    <View style={styles.container}>
      {/* Chart and Legend Side by Side */}
      <View style={styles.chartRow}>
        {/* Donut Chart with Center Text */}
        <View style={styles.chartSection}>
          <Svg width={size} height={size}>
            {segments.map((segment, index) => {
              const startAngleRad = (segment.startAngle * Math.PI) / 180;
              const endAngleRad = (segment.endAngle * Math.PI) / 180;
              
              const x1 = center + radius * Math.cos(startAngleRad);
              const y1 = center + radius * Math.sin(startAngleRad);
              const x2 = center + radius * Math.cos(endAngleRad);
              const y2 = center + radius * Math.sin(endAngleRad);

              const largeArcFlag = segment.percentage > 50 ? 1 : 0;

              const pathData = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z',
              ].join(' ');

              return (
                <G key={index}>
                  <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={CATEGORY_COLORS[segment.category]}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${(segment.percentage / 100) * circumference} ${circumference}`}
                    strokeDashoffset={-((segment.startAngle + 90) / 360) * circumference}
                    rotation={0}
                    origin={`${center}, ${center}`}
                  />
                </G>
              );
            })}
          </Svg>
          <View style={styles.centerLabel}>
            <Text style={styles.centerTitle}>Expense</Text>
          </View>
        </View>

        {/* Legend on the Right */}
        <View style={styles.legendSection}>
          {data.map((item, index) => (
            <View key={`${item.category}-${index}`} style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: CATEGORY_COLORS[item.category] },
                ]}
              />
              <Text style={styles.legendIcon}>
                {CATEGORY_ICONS[item.category]}
              </Text>
              <Text style={styles.legendPercentage}>{item.percentage.toFixed(0)}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Percentage Display Below - Removed since percentages are now inline */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartSection: {
    position: 'relative',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary_text,
  },
  legendSection: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  legendPercentage: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary_text,
  },
  percentageSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  percentageItem: {
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
});
