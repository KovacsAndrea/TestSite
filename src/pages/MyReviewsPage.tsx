import React from "react";

type Review = {
  id: string;
  book: string;
  rating: number;
  comment: string;
  date: string;
};

const mockReviews: Review[] = [
  {
    id: "1",
    book: "The Name of the Wind",
    rating: 5,
    comment: "Amazing world-building and storytelling. Couldn't put it down.",
    date: "10 Mar 2026",
  },
  {
    id: "2",
    book: "A Game of Thrones",
    rating: 4,
    comment: "Very immersive with complex characters and politics.",
    date: "02 Mar 2026",
  },
  {
    id: "3",
    book: "The Hobbit",
    rating: 5,
    comment: "A timeless fantasy adventure full of charm.",
    date: "20 Feb 2026",
  },
];

const renderStars = (rating: number) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};

export const MyReviewsPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7faf9",
        padding: "40px 24px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
          My Reviews
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          See the reviews you’ve written for books.
        </p>

        {/* Reviews List */}
        <div style={{ display: "grid", gap: "16px" }}>
          {mockReviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderLeft: "4px solid #79d9b2",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontWeight: 600 }}>{review.book}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {review.date}
                </div>
              </div>

              <div
                style={{
                  color: "#9c27b0",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                {renderStars(review.rating)}
              </div>

              <div style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
                {review.comment}
              </div>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#9c27b0",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit Review
              </button>
            </div>
          ))}
        </div>

        {/* Write Review Section */}
        <div
          style={{
            marginTop: "32px",
            background: "white",
            padding: "24px",
            borderRadius: "14px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            Want to review another book?
          </p>

          <button
            style={{
              background: "#79d9b2",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Write New Review
          </button>
        </div>
      </div>
    </div>
  );
};