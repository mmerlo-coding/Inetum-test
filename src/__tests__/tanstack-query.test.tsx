import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/app/page";

// Mock the fetch API
global.fetch = jest.fn();

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("Home Page Data Fetching", () => {
  //This cleans the fetch mock before each test
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch and display users from the API", async () => {
    const mockUsers = [
      { id: 1, name: "Leanne Graham", username: "Bret" },
      { id: 2, name: "Ervin Howell", username: "Antonette" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
  });

  it("should handle API error gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
  });
});
