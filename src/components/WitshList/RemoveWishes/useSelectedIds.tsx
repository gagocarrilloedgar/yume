import React from "react";

const SelectedIdscContext = React.createContext<
  ReturnType<typeof useSelectedIds>
>(undefined as any);

export const SelectedIdsProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const value = useSelectedIds();

  return (
    <SelectedIdscContext.Provider value={value}>
      {children}
    </SelectedIdscContext.Provider>
  );
};

export const useSelectedContext = () => {
  const context = React.useContext(SelectedIdscContext);

  if (!context) {
    throw new Error(
      "useSelectedContext must be used within a SelectedIdsProvider"
    );
  }

  return context;
};

export const useSelectedIds = () => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id))
      return setSelectedIds((prev) => prev.filter((prevId) => prevId !== id));

    setSelectedIds((prev) => [...prev, id]);
  };

  const reset = () => setSelectedIds([]);

  return { selectedIds, handleSelect, reset };
};
