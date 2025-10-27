export function getAITip(): string {
  const tips = [
    "💰 Save before you spend — pay yourself first!",
    "📊 Track your weekly expenses to spot patterns",
    "🌱 Small savings make a big difference over time",
    "🧠 Avoid impulse purchases — wait 24 hours before buying",
    "🔒 Keep your financial data private and secure",
    "🎯 Set realistic savings goals and celebrate milestones",
    "📱 Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
    "💡 Review your spending weekly to stay on track",
    "🏦 Build an emergency fund for unexpected expenses",
    "📈 Start investing early — even small amounts count",
    "🍕 Cook at home to save money on food expenses",
    "🚶 Walk or bike when possible to save on transport",
    "📚 Use student discounts whenever available",
    "💳 Avoid credit card debt — pay in full each month",
    "🎓 Invest in yourself through education and skills"
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}

export function getMultipleTips(count: number = 3): string[] {
  const tips = [
    "💰 Save before you spend — pay yourself first!",
    "📊 Track your weekly expenses to spot patterns",
    "🌱 Small savings make a big difference over time",
    "🧠 Avoid impulse purchases — wait 24 hours before buying",
    "🔒 Keep your financial data private and secure",
    "🎯 Set realistic savings goals and celebrate milestones",
    "📱 Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
    "💡 Review your spending weekly to stay on track",
    "🏦 Build an emergency fund for unexpected expenses",
    "📈 Start investing early — even small amounts count",
    "🍕 Cook at home to save money on food expenses",
    "🚶 Walk or bike when possible to save on transport",
    "📚 Use student discounts whenever available",
    "💳 Avoid credit card debt — pay in full each month",
    "🎓 Invest in yourself through education and skills"
  ];
  
  const shuffled = [...tips].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
