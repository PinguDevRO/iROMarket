import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ItemSaleKind = "vending" | "buying";
export type ServerKind = "chaos" | "thor" | "freya";

export type State = {
    _hasHydrated: boolean;
    search_query: string;
    page: number;
    page_size: number;
    item_sale_kind: ItemSaleKind;
    server: ServerKind;

    set_search_query: (search_query: string) => void;
    set_page: (page: number) => void;
    set_page_size: (page_size: number) => void;
    set_item_sale_kind: (item_sale_kind: ItemSaleKind) => void;
    set_server: (server: ServerKind) => void;
};

export const initialState = {
    _hasHydrated: false,
    search_query: "",
    page: 0,
    page_size: 25,
    item_sale_kind: 'vending' as ItemSaleKind,
    server: 'chaos' as ServerKind,
};

export const useStore = create<State>()(
    persist(
        (set) => ({
            ...initialState,

            set_search_query: (search_query: string) => {
                set({ search_query });
            },
            set_page: (page: number) => {
                set({ page });
            },
            set_page_size: (page_size: number) => {
               set({ page_size }); 
            },
            set_item_sale_kind: (item_sale_kind: ItemSaleKind) => {
                set({ item_sale_kind });
            },
            set_server: (server: ServerKind) => {
                set({ server });
            },
        }),
        {
            name: 'market-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state._hasHydrated = true;
                }
            },
        }
    )
);
