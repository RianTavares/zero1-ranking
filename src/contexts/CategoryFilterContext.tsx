import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

type CategoryFilterContextType = {
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
};

type WithChildrenProps = {
    children: React.ReactNode;
};

export const CategoryFilterContext = createContext<CategoryFilterContextType>({
    selectedCategory: '',
    setSelectedCategory: () => {}
});

export const CategoryFilterProvider = ({ children }: WithChildrenProps) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <CategoryFilterContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryFilterContext.Provider>
    );
};

export const useFilter = () => useContext(CategoryFilterContext);
