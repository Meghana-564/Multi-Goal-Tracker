// Mock AI Service returning simulated AI responses

exports.generateRoadmap = async (prompt) => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    title: `AI Generated: ${prompt.substring(0, 20)}...`,
    description: `A comprehensive roadmap generated based on your goal: "${prompt}".`,
    category: "AI Generated",
    steps: [
      { title: "Understand the Basics", description: "Learn the foundational concepts.", resourceLinks: ["https://example.com/basics"], order: 1 },
      { title: "Intermediate Core Concepts", description: "Dive deeper into the main topics.", resourceLinks: ["https://example.com/intermediate"], order: 2 },
      { title: "Advanced Projects", description: "Build real-world projects to solidify knowledge.", resourceLinks: ["https://example.com/advanced"], order: 3 }
    ]
  };
};

exports.enhanceStep = async (stepContent) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    description: `(Enhanced by AI) ${stepContent.description}. Make sure to practice this thoroughly by building small scripts.`,
    resourceLinks: [...(stepContent.resourceLinks || []), "https://youtube.com/suggested_ai_video"]
  };
};

exports.chat = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    reply: `As an AI assistant, here is my thought on "${message}": Keep up the great work! Break the problem down into smaller parts.`
  };
};
