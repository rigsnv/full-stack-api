import React, { useState } from "react";

const JsonTree = ({ data }) => {
    const renderTree = (node) => {
        if (typeof node !== "object" || node === null) {
            // Render primitive values (string, number, boolean, null)
            return <span>{String(node)}</span>;
        }

        return Object.entries(node).map(([key, value]) => (
            <TreeNode key={key} nodeKey={key} value={value} />
        ));
    };

    const TreeNode = ({ nodeKey, value }) => {
        const [collapsed, setCollapsed] = useState(true);

        const toggleCollapse = () => setCollapsed(!collapsed);

        return (
            <div style={{ marginLeft: "20px" }}>
                <span onClick={toggleCollapse} style={{ cursor: "pointer" }}>
                    {typeof value === "object" && value !== null ? (
                        collapsed ? "▶" : "▼"
                    ) : null}
                </span>{" "}
                <strong>{nodeKey}:</strong>{" "}
                {typeof value !== "object" || value === null ? (
                    <span>{String(value)}</span>
                ) : (
                    !collapsed && <div>{renderTree(value)}</div>
                )}
            </div>
        );
    };

    return <div>{renderTree(data)}</div>;
};

const Contract = ({ releases, num }) => {
    return (
        <div>
            <h1>Contract {num}</h1>
            <div className="contract-data">
            <JsonTree data={releases} />
            </div>
        </div>
    );
};

export default Contract;