export default function FormMessage({ success, message }: { success?: boolean; message: string }) {
  if (success) {
    return <p className="text-sm font-medium text-green-500">{message}</p>;
  } else {
    return <p className="text-sm font-medium text-destructive">{message}</p>;
  }
}
