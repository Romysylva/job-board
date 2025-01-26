import React, { useState, useEffect } from "react";

const InfoSection = ({
  fetchData,
  onAddNewItem,
  renderItem,
  headerTitle = "View Items", // Title for the toggle button
  addButtonLabel = "Add Item",
  initialItems = [], // Optional initial data
  emptyMessage = "No items available.",
}) => {
  const [items, setItems] = useState(initialItems);
  const [viewItems, setViewItems] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch data when the component is mounted or toggled
  useEffect(() => {
    if (viewItems && fetchData) {
      setLoading(true);
      fetchData()
        .then((data) => setItems(data || []))
        .catch((err) => console.error("Error fetching data:", err))
        .finally(() => setLoading(false));
    }
  }, [viewItems, fetchData]);

  // Toggle visibility of the items
  const toggleViewItems = () => {
    setViewItems((prev) => !prev);
  };

  // Handle adding a new item
  const handleNewItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
    setShowAddDialog(false);
    if (onAddNewItem) onAddNewItem(newItem);
  };

  return (
    <div className="info-section">
      <div className="info-header">
        <button onClick={toggleViewItems} className="toggle-items-button">
          {viewItems ? `Hide ${headerTitle}` : headerTitle}
        </button>
        <button
          onClick={() => setShowAddDialog(true)}
          className="add-item-button"
        >
          {addButtonLabel}
        </button>
      </div>

      {viewItems && (
        <div className="items-list">
          {loading ? (
            <p>Loading...</p>
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id || index} className="item">
                {renderItem(item)}
              </div>
            ))
          ) : (
            <p>{emptyMessage}</p>
          )}
        </div>
      )}

      {showAddDialog && (
        <>
          <div
            className="overlay"
            onClick={() => setShowAddDialog(false)}
          ></div>
          <div className="add-dialog">
            {/* A placeholder for the custom form or component */}
            <h3>Add New Item</h3>
            <button
              onClick={() =>
                handleNewItem({ id: Date.now(), content: "New Item" })
              }
            >
              Add Dummy Item
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoSection;
