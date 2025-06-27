
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, Users, TrendingUp } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';

const AdminDashboard: React.FC = () => {
  const { content, loading } = useCMS();

  const stats = {
    totalContent: content.length,
    categories: [...new Set(content.map(item => item.category).filter(Boolean))].length,
    recentUpdates: content.filter(item => {
      const updated = new Date(item.updated_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return updated > weekAgo;
    }).length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">CMS Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalContent}</div>
              <p className="text-xs text-muted-foreground">Content items</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.categories}</div>
              <p className="text-xs text-muted-foreground">Content categories</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.recentUpdates}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media Files</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <FileText className="h-8 w-8 mb-2 text-blue-600" />
                <h3 className="font-medium">Manage Content</h3>
                <p className="text-sm text-gray-600">Edit website content and translations</p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                <Image className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="font-medium">Media Library</h3>
                <p className="text-sm text-gray-600">Upload and manage images (Coming Soon)</p>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                <TrendingUp className="h-8 w-8 mb-2 text-purple-600" />
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-gray-600">View content performance (Coming Soon)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
