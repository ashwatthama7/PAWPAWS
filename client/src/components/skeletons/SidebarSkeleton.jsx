import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-gray-200 bg-white flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-gray-200 w-full p-4 bg-gray-50">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700 hidden lg:block text-lg">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full flex-1">
        {skeletonContacts.map((_, idx) => (
          <div 
            key={idx} 
            className="w-full px-3 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
          >
            {/* Avatar skeleton */}
            <div className="relative">
              <div className="skeleton size-10 rounded-full bg-gray-200" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded bg-gray-200" />
              <div className="skeleton h-3 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Optional footer */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 hidden lg:block">
        <div className="skeleton h-4 w-full rounded bg-gray-200" />
      </div>
    </aside>
  );
};

export default SidebarSkeleton;