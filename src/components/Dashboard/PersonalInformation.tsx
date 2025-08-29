"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UserPen, X, Save } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserProfile, userProfileUpdate } from "@/lib/api";

// --- Type Definitions ---
interface UserProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: string;
  profileImage?: string; // Added profileImage field
}

interface FormData {
  name: string;
  username: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
}

export default function PersonalInformation() {
  // -----------------------
  // API Call (Get Profile)
  // -----------------------
  const { data: userResponse, isLoading, isError } = useQuery<{ data: UserProfile }>({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });

  // -----------------------
  // States
  // -----------------------
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });
  const [originalData, setOriginalData] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null); // Added state for image name

  // -----------------------
  // When API data arrives, populate formData
  // -----------------------
  useEffect(() => {
    if (userResponse?.data) {
      const apiData: FormData = {
        name: userResponse.data.name || "",
        username: userResponse.data.username || "",
        phone: userResponse.data.phone || "",
        gender: userResponse.data.gender || "",
        dob: userResponse.data.dob ? userResponse.data.dob.split("T")[0] : "",
        address: userResponse.data.address || "",
      };
      setFormData(apiData);
      setOriginalData(apiData);
      setImageName(userResponse?.data?.profileImage || null); // Set existing image name if any
    }
  }, [userResponse]);

  // -----------------------
  // Mutation (Update Profile)
  // -----------------------
  const mutation = useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: Partial<FormData> & { profileImage?: string } }) =>
      userProfileUpdate(userId, payload),
    onSuccess: (data) => {
      console.log("Profile Updated ✅", data);
      setIsEditing(false);
      setOriginalData(formData); // update successful
    },
    onError: (error) => {
      console.error("Update failed ❌", error.message);
    },
  });

  // -----------------------
  // Handlers
  // -----------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file)
    if (file) {
      setImageFile(file);
      setImageName(file.name); // Store only the file name
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalData || !userResponse?.data?._id) return;

    console.log(formData)
    // Collect updated fields
    const updatedFields: Partial<FormData> & { profileImage?: string } = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (imageName) {
      updatedFields.profileImage = imageName; 
    }

    console.log(imageName)

    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes made 🚫");
      setIsEditing(false);
      return;
    }

    console.log("Updated Fields to send ✅", updatedFields);

    // API call
    mutation.mutate({
      userId: userResponse.data._id,
      payload: updatedFields, // Use the payload with image name
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="mx-auto container mt-10 space-y-8">
      {/* Page Title with Breadcrumb */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <nav className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-1">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <span>&gt;</span>
          <Link href="/dashboard/setting" className="hover:underline">
            Settings
          </Link>
          <span>&gt;</span>
          <span className="text-primary">Personal Information</span>
        </nav>
      </div>

      {/* Profile Header */}
      <div className="rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 bg-red-300">
              <AvatarFallback>
                {userResponse?.data?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">
                {userResponse?.data?.name || "User"}
              </p>
              <p className="text-sm text-muted-foreground">
                {userResponse?.data?.email || ""}
              </p>
            </div>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#0F3D68] text-white cursor-pointer"
            >
              <UserPen size={16} /> Update Profile
            </Button>
          )}
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              type="text"
              name="name"
              className="h-12"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">User Name</label>
            <Input
              type="text"
              name="username"
              className="h-12"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              type="tel"
              name="phone"
              className="h-12"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-12 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* DOB */}
          <div>
            <label className="block text-sm font-medium mb-2">Date of Birth</label>
            <Input
              type="date"
              name="dob"
              className="h-12"
              value={formData.dob}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <Input
              type="text"
              name="address"
              className="h-12"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Profile Image */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium mb-2">Profile Picture</label>
              <Input
                type="file"
                name="profileImage"
                className="h-12"
                onChange={handleFileChange}
              />
              {imageFile && (
                <div className="mt-2 text-sm">
                  <p>File Selected: {imageFile.name}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                if (originalData) setFormData(originalData);
                setIsEditing(false);
              }}
            >
              <X size={16} /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-2 bg-[#0F3D68] text-white cursor-pointer"
            >
              <Save size={16} />{" "}
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
