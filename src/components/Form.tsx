"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing } from "@/lib/types";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Close, PlusOne } from "@mui/icons-material";

interface EditListingFormProps {
  details: Listing;
}

export function EditListingForm({ details }: EditListingFormProps) {
  const [formData, setFormData] = useState({
    make: details.make,
    model: details.model,
    year: details.year,
    pricePerDay: details.pricePerDay,
    location: details.location,
    description: details.description || "",
  });
  const [features, setFeatures] = useState<string[]>(details.features);
  const [newFeature, setNewFeature] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures((prev) => [...prev, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures((prev) =>
      prev.filter((feature) => feature !== featureToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/rentals/${details.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          features,
          year: Number.parseInt(formData.year.toString()),
          pricePerDay: Number.parseFloat(formData.pricePerDay.toString()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      toast.success("Details has been updated successfully.");

      router.push(`/dashboard`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <span>Vehicle Information</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <TextField
                  label="Make"
                  id="make"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  required
                />
              </div>
              <div>
                <TextField
                  id="model"
                  label="Model"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <TextField
                  label="Year"
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    handleInputChange("year", Number.parseInt(e.target.value))
                  }
                  required
                />
              </div>
              <div>
                <TextField
                  id="price"
                  label="Price per Day (AED)"
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    handleInputChange(
                      "pricePerDay",
                      Number.parseFloat(e.target.value)
                    )
                  }
                  required
                />
              </div>
            </div>

            <div>
              <TextField
                id="location"
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <div>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                placeholder="Describe the vehicle..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span>Features</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <TextField
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature..."
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
              />
              <Button type="button" onClick={addFeature}>
                <PlusOne className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <Badge key={feature} className="flex items-center gap-1">
                  {feature}
                  <Button
                    onClick={() => removeFeature(feature)}
                    className="ml-1 cur"
                  >
                    <Close className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            {features.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No features added yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-5">
        <Button type="button" variant="outlined" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? (
            <span>
              <CircularProgress
                sx={{
                  height: "25px !important",
                  width: "25px !important",
                  color: "white",
                }}
              />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
