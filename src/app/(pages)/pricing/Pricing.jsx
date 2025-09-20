"use client";

import { Check } from "lucide-react";

// Simple inline components instead of external imports
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md border ${className || ""}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

const userPlans = [
  {
    name: "Pre",
    price: "$25",
    period: "/month",
    description: "Great for individuals just getting started.",
    features: [
      "5 assessments/month",
      "Basic templates",
      "Email support",
      "Community access",
    ],
    popular: false,
  },
  {
    name: "Mid",
    price: "$50",
    period: "/month",
    description: "Best for professionals who need unlimited usage.",
    features: [
      "Unlimited assessments",
      "Premium templates",
      "Priority support",
      "Advanced AI features",
      "Export to PDF/CSV",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "$80",
    period: "/month",
    description: "Perfect for small teams and power users.",
    features: [
      "Unlimited assessments",
      "Premium templates",
      "Priority support",
      "Advanced AI",
      "Custom AI models",
      "24/7 phone support",
      "Team collaboration",
    ],
    popular: false,
  },
];

// const integrationPlans = [
//   {
//     name: "Startup API",
//     price: "$150",
//     period: "/month",
//     description: "For startups looking to embed assessments in their apps.",
//     features: [
//       "10,000 API calls/month",
//       "Standard API access",
//       "Email & Slack support",
//     ],
//   },
//   {
//     name: "Business API",
//     price: "$500",
//     period: "/month",
//     description: "For businesses scaling integrations.",
//     features: [
//       "100,000 API calls/month",
//       "Premium API access",
//       "Dedicated account manager",
//       "Priority support",
//     ],
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "",
//     description: "Tailored solutions for large enterprises.",
//     features: [
//       "Unlimited API calls",
//       "Custom AI integrations",
//       "On-prem deployment options",
//       "24/7 enterprise-grade support",
//     ],
//   },
// ];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* User Pricing */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Pricing</h1>
        <p className="text-lg text-gray-600">
          Choose the plan that best fits your needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-20">
        {userPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.popular ? "border-blue-600 ring-2 ring-blue-600" : ""}`}
          >
            <CardContent className="flex flex-col flex-1">
              {plan.popular && (
                <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full self-start mb-3">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <div className="text-3xl font-extrabold mb-4">
                {plan.price}
                <span className="text-lg font-medium">{plan.period}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* 👇 push to bottom properly */}
              <div className="mt-auto">
                <Button className="w-full">Choose {plan.name}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="max-w-3xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Not sure which plan is right for you? Our team is here to help you pick the
          best option for your needs.
        </p>
        <Button>Contact Us</Button>
        <p className="text-sm text-gray-500 mt-4">
          All plans come with a 14-day free trial. Cancel anytime.
        </p>
      </div>

      {/* Integration Pricing */}
      {/* <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Integration Pricing</h2>
        <p className="text-lg text-gray-600">
          Flexible API and integration plans for startups, businesses, and enterprises.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {integrationPlans.map((plan) => (
          <Card key={plan.name}>
            <CardContent className="flex flex-col">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <div className="text-3xl font-extrabold mb-4">
                {plan.price}
                <span className="text-lg font-medium">{plan.period}</span>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full">
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
