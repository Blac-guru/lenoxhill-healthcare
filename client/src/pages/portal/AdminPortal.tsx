import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export default function AdminPortal() {
  const { user } = useAuth();

  // Temporary: requests will come from Firestore later
  const requests: any[] = [];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700">
            Lenox Hill Medical Portal
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Incoming Medication Requests
          </h2>

          {requests.length === 0 ? (
            <p className="text-gray-500 mt-4 italic">
              No purchase requests made yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {requests.map((req, index) => (
                <li
                  key={index}
                  className="rounded-lg border p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="font-medium text-gray-900">
                    {req.medicationName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ordered by: {req.clientName} ({req.clientPhone})
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
