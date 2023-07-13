import { useToast } from "@/components/ui/use-toast"

export interface IError {
  message: string
  response: {
    error: {
      message: string
    }
  }
}

export const ShowApiError = (error: IError) => {
  const { toast } = useToast()

  return toast({
    variant: "destructive",
    title: error?.response?.error?.message
      ? error?.response?.error?.message
      : error?.message,
  })
}
