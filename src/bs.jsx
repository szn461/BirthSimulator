import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Globe,
  BarChart,
  Flag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const BirthSimulator = () => {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState(null);

  const countryData = [
    {
      name: "印度",
      percentage: 20.0578,
      population: 2322,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "其他非洲国家",
      percentage: 17.8941,
      population: 2071,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "中国",
      percentage: 7.7918,
      population: 902,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "尼日利亚",
      percentage: 6.4872,
      population: 751,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "巴基斯坦",
      percentage: 5.945,
      population: 688,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "印度尼西亚",
      percentage: 3.872,
      population: 448,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "刚果",
      percentage: 3.7747,
      population: 437,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "埃塞俄比亚",
      percentage: 3.5466,
      population: 411,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "美国",
      percentage: 3.1595,
      population: 366,
      region: "美洲",
      color: "#f6ad55",
    },
    {
      name: "孟加拉国",
      percentage: 3.0148,
      population: 349,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "巴西",
      percentage: 2.2474,
      population: 260,
      region: "美洲",
      color: "#f6ad55",
    },
    {
      name: "埃及",
      percentage: 2.0732,
      population: 240,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "坦桑尼亚",
      percentage: 2.0214,
      population: 234,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "墨西哥",
      percentage: 1.7536,
      population: 203,
      region: "美洲",
      color: "#f6ad55",
    },
    {
      name: "菲律宾",
      percentage: 1.5895,
      population: 184,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "越南",
      percentage: 1.1921,
      population: 138,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "俄罗斯",
      percentage: 1.1143,
      population: 129,
      region: "欧洲",
      color: "#9f7aea",
    },
    {
      name: "莫桑比克",
      percentage: 1.0884,
      population: 126,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "南非",
      percentage: 1.0193,
      population: 118,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "伊朗",
      percentage: 1.0107,
      population: 117,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "伊拉克",
      percentage: 0.9934,
      population: 115,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "尼日尔",
      percentage: 0.9416,
      population: 109,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "土耳其",
      percentage: 0.9243,
      population: 107,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "马达加斯加",
      percentage: 0.8638,
      population: 100,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "科特迪瓦",
      percentage: 0.8552,
      population: 99,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "喀麦隆",
      percentage: 0.8206,
      population: 95,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "马里",
      percentage: 0.8206,
      population: 95,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "乌兹别克斯坦",
      percentage: 0.812,
      population: 94,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "阿尔及利亚",
      percentage: 0.7774,
      population: 90,
      region: "非洲",
      color: "#48bb78",
    },
    {
      name: "缅甸",
      percentage: 0.7774,
      population: 90,
      region: "亚洲",
      color: "#4299e1",
    },
    {
      name: "加纳",
      percentage: 0.7602,
      population: 88,
      region: "非洲",
      color: "#48bb78",
    },
  ];

  const regions = [...new Set(countryData.map((item) => item.region))].map(
    (region) => ({
      name: region,
      color: countryData.find((item) => item.region === region)?.color,
      countries: countryData.filter((item) => item.region === region),
    })
  );

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    const spinDuration = 3000 + Math.random() * 2000;
    const startTime = Date.now();

    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * countryData.length);
      setResult(countryData[randomIndex]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const random = Math.random() * 100;
      let cumulative = 0;
      let selectedCountry = null;

      for (const country of countryData) {
        cumulative += country.percentage;
        if (random <= cumulative) {
          selectedCountry = country;
          break;
        }
      }

      setResult(selectedCountry || countryData[0]);
      setIsSpinning(false);
    }, spinDuration);
  };

  const toggleRegion = (region) => {
    if (expandedRegion === region) {
      setExpandedRegion(null);
    } else {
      setExpandedRegion(region);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 flex items-center justify-center"
          >
            <Globe className="mr-3 text-blue-500" size={32} />
            投胎模拟器
          </motion.h1>
          <p className="text-lg md:text-xl text-center text-gray-600 mt-2">
            全球新生儿出生概率体验
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Wheel Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <BarChart className="mr-2 text-blue-500" size={24} />
                出生概率转盘
              </h2>

              <div className="relative flex justify-center my-8">
                <motion.div
                  animate={{
                    rotate: isSpinning ? [0, 3600] : 0,
                    transition: isSpinning
                      ? {
                          duration: 3,
                          ease: [0.2, 0.8, 0.4, 1],
                          repeat: Infinity,
                        }
                      : {},
                  }}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full relative overflow-hidden border-8 border-white shadow-lg"
                  style={{
                    background: `conic-gradient(${countryData
                      .map(
                        (country, i) =>
                          `${country.color} ${
                            i === 0
                              ? 0
                              : countryData
                                  .slice(0, i)
                                  .reduce(
                                    (acc, curr) => acc + curr.percentage,
                                    0
                                  )
                          }% ${countryData
                            .slice(0, i + 1)
                            .reduce((acc, curr) => acc + curr.percentage, 0)}%`
                      )
                      .join(", ")})`,
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </motion.div>

                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg z-10"></div>
              </div>

              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className={`px-8 py-3 rounded-full text-white font-medium flex items-center ${
                    isSpinning ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  <RotateCcw className="mr-2" size={18} />
                  {isSpinning ? "转动中..." : "开始投胎"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Flag className="mr-2 text-blue-500" size={24} />
                投胎结果
              </h2>

              <AnimatePresence>
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 rounded-lg p-6 text-center"
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: result.color }}
                    >
                      {result.name}
                    </div>
                    <div
                      className="text-5xl font-bold my-4"
                      style={{ color: result.color }}
                    >
                      {result.percentage}%
                    </div>
                    <div className="text-gray-600 mb-4">
                      约{result.population}万新生儿
                    </div>
                    <div className="text-sm text-gray-500">
                      {result.percentage > 5
                        ? "🏆 高概率地区"
                        : result.percentage > 1
                        ? "🌍 中等概率地区"
                        : "✨ 低概率地区"}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-50 rounded-lg p-6 text-center h-64 flex items-center justify-center"
                  >
                    <div className="text-gray-400">
                      点击"开始投胎"按钮试试你的运气
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">全球出生人口统计</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regions}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value }) =>
                          `${name} ${value.toFixed(1)}%`
                        }
                      >
                        {regions.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Country List */}
        <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">
          <h2 className="text-2xl font-semibold p-6 pb-0 flex items-center">
            <Globe className="mr-2 text-blue-500" size={24} />
            各国出生概率详情
          </h2>
          <p className="px-6 text-gray-500">全球总出生人口: 11576.32 万人</p>

          <div className="divide-y divide-gray-100">
            {regions.map((region) => (
              <div key={region.name}>
                <button
                  onClick={() => toggleRegion(region.name)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  style={{
                    backgroundColor:
                      expandedRegion === region.name ? "#f8fafc" : "white",
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="font-medium">{region.name}</span>
                  </div>
                  {expandedRegion === region.name ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedRegion === region.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {region.countries.map((country) => (
                            <div
                              key={country.name}
                              className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                              style={{ borderColor: country.color }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">
                                    {country.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    约{country.population}万人
                                  </div>
                                </div>
                                <div
                                  className="text-xl font-bold px-2 py-1 rounded"
                                  style={{
                                    color: country.color,
                                    backgroundColor: `${country.color}10`,
                                  }}
                                >
                                  {country.percentage}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BirthSimulator;
