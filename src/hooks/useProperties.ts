import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { apiJson } from "../api";

const PROPERTIES_ENDPOINT = "/api/properties";

export interface Property {
  id: number;
  name: string;
  [key: string]: unknown;
}

export type PropertyList = Property[];

export type CreatePropertyInput = {
  name: string;
  [key: string]: unknown;
};

export const propertyKeys = {
  all: ["properties"] as const,
  lists: () => [...propertyKeys.all, "list"] as const,
};

async function getPropertyList(): Promise<PropertyList> {
  return apiJson<PropertyList>(PROPERTIES_ENDPOINT);
}

async function createProperty(input: CreatePropertyInput): Promise<Property> {
  return apiJson<Property>(PROPERTIES_ENDPOINT, {
    method: "POST",
    body: input,
  });
}

type UsePropertyListOptions = Omit<
  UseQueryOptions<
    PropertyList,
    Error,
    PropertyList,
    ReturnType<typeof propertyKeys.lists>
  >,
  "queryKey" | "queryFn"
>;

type UseCreatePropertyOptions = UseMutationOptions<
  Property,
  Error,
  CreatePropertyInput
>;

export function usePropertyList(options?: UsePropertyListOptions) {
  return useQuery({
    queryKey: propertyKeys.lists(),
    queryFn: getPropertyList,
    ...options,
  });
}

export function useCreateProperty(options?: UseCreatePropertyOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProperty,
    ...options,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
