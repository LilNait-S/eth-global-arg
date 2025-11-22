import { BASE_CACHE_KEYS } from "@/constants/query-cache"
import { PoapEvent } from "@/types/poap"
import { useAccount } from "wagmi"
import {
  externalBackendBasePath,
  genericAuthRequest,
  useAppQuery,
} from "../base"

export const useGetEventPoapById = ({ eventId }: { eventId: string }) => {
  return useAppQuery<PoapEvent>({
    fetcher: async () =>
      await genericAuthRequest("get", `/events/id/${eventId}`, undefined, {
        baseURL: externalBackendBasePath.poap,
        useCredentials: false,
        headers: {
          "X-API-Key":
            "JDu21TYPWyaeuYSTVVHkLB9YhgH6tIJmLRfA3ptckXmKO6xkrw9EBfKDfp8tUWfl1T61OCMwWzzSZAXos9MVhFFdps0nI1gER4kgkjc9Os9hDw9TgYJQqbgWGjclJoQT",
        },
      }),
    queryKey: [BASE_CACHE_KEYS.getPoapEventById, eventId],
  })
}

export const useGetScanAddress = () => {
  const { address } = useAccount()
  return useAppQuery<unknown>({
    fetcher: async () =>
      await genericAuthRequest("get", `/actions/scan/${address}`, undefined, {
        baseURL: externalBackendBasePath.poap,
        useCredentials: false,
        headers: {
          "X-API-Key":
            "JDu21TYPWyaeuYSTVVHkLB9YhgH6tIJmLRfA3ptckXmKO6xkrw9EBfKDfp8tUWfl1T61OCMwWzzSZAXos9MVhFFdps0nI1gER4kgkjc9Os9hDw9TgYJQqbgWGjclJoQT",
        },
      }),
    queryKey: [BASE_CACHE_KEYS.getScanAddress, address],
    options: {
      enabled: !!address,
    },
  })
}
