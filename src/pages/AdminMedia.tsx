
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image } from 'lucide-react';

const AdminMedia: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Media Management</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="h-5 w-5" />
              <span>Media Library</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Media Management Coming Soon</h3>
              <p className="text-gray-600">
                Upload and manage images, videos, and other media files for your website.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
