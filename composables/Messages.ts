function getMessage(error: unknown) {
  if (typeof error === "string") {
    return error
  } else if ((error as { name: string }).name === "FetchError") {
    return (error as { data: { message: string } }).data.message
  } else if (error instanceof Error) {
    return error.message
  }
}

export function useMessages() {
  const toast = useToast()

  return {
    error(message: unknown) {
      toast.add({
        color: "red",
        icon: "i-heroicons-exclamation-circle-solid",
        title: "Speichern fehlgeschlagen",
        description: getMessage(message),
        timeout: 0,
      })
    },

    info(title: string) {
      toast.add({ icon: "i-heroicons-success", title })
    },
  }
}
