"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, TrendingUp, Users, Zap } from "lucide-react";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  rating: number;
  totalTrades: number;
  cardsOwned: number;
  favoriteArchetype: string;
  location: string;
  isOnline: boolean;
  rareCards: string[];
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    username: "BlueEyesMaster",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    totalTrades: 127,
    cardsOwned: 2340,
    favoriteArchetype: "Blue-Eyes",
    location: "California, USA",
    isOnline: true,
    rareCards: ["Blue-Eyes Ultimate Dragon", "Blue-Eyes White Dragon (LOB-001)"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    username: "DarkMagicianGirl",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    totalTrades: 89,
    cardsOwned: 1890,
    favoriteArchetype: "Dark Magician",
    location: "New York, USA",
    isOnline: false,
    rareCards: ["Dark Magician Girl (MFC-000)", "Magician of Black Chaos"],
  },
  {
    id: "3",
    name: "Kenji Tanaka",
    username: "ExodiaCollector",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5.0,
    totalTrades: 203,
    cardsOwned: 3120,
    favoriteArchetype: "Exodia",
    location: "Tokyo, Japan",
    isOnline: true,
    rareCards: ["Exodia the Forbidden One", "Right Arm of the Forbidden One"],
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    username: "ElementalHero",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    totalTrades: 156,
    cardsOwned: 2100,
    favoriteArchetype: "Elemental HERO",
    location: "Madrid, Spain",
    isOnline: true,
    rareCards: ["Elemental HERO Sparkman", "Polymerization (LOB-059)"],
  },
  {
    id: "5",
    name: "David Kim",
    username: "DragonRuler",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    totalTrades: 78,
    cardsOwned: 1650,
    favoriteArchetype: "Dragon",
    location: "Seoul, South Korea",
    isOnline: false,
    rareCards: ["Red-Eyes Black Dragon", "Five-Headed Dragon"],
  },
  {
    id: "6",
    name: "Emma Wilson",
    username: "HarpieQueen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    totalTrades: 134,
    cardsOwned: 1980,
    favoriteArchetype: "Harpie",
    location: "London, UK",
    isOnline: true,
    rareCards: ["Harpie's Pet Dragon", "Harpie Lady Sisters"],
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tradeMessage, setTradeMessage] = useState("");
  const [selectedCards, setSelectedCards] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.favoriteArchetype.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMakeOffer = (user: User) => {
    setSelectedUser(user);
  };

  const handleSubmitOffer = () => {
    // Here you would typically send the trade offer to your backend
    console.log("Trade offer submitted:", {
      targetUser: selectedUser?.id,
      message: tradeMessage,
      cards: selectedCards,
    });
    setSelectedUser(null);
    setTradeMessage("");
    setSelectedCards("");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-slate-50 mt-2">
          <h1 className="text-4xl font-bold mb-2">Échanges de cartes</h1>
          <p className="italic">Trouves l&apos;utilisateur avec qui tu souhaites échanger</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, username, or favorite archetype..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-50"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
                <p className="text-gray-600">Demandes d&apos;échanges</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-gray-600">Trades This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Zap className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
                <p className="text-gray-600">Active Traders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-gray-600">Trades This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Zap className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>@{user.username}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Trades</p>
                    <p className="font-semibold">{user.totalTrades}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cards</p>
                    <p className="font-semibold">{user.cardsOwned.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Favorite Archetype</p>
                  <Badge variant="secondary">{user.favoriteArchetype}</Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="text-sm">{user.location}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Notable Cards</p>
                  <div className="space-y-1">
                    {user.rareCards.slice(0, 2).map((card, index) => (
                      <p key={index} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {card}
                      </p>
                    ))}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => handleMakeOffer(user)} disabled={!user.isOnline}>
                      {user.isOnline ? "Make Trade Offer" : "User Offline"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Make Trade Offer to {user.name}</DialogTitle>
                      <DialogDescription>
                        Send a trade proposal to @{user.username}. Be specific about what cards you want and what you're
                        offering.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cards">Cards You Want</Label>
                        <Select onValueChange={setSelectedCards}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select from their collection" />
                          </SelectTrigger>
                          <SelectContent>
                            {user.rareCards.map((card, index) => (
                              <SelectItem key={index} value={card}>
                                {card}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Trade Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Hi! I'm interested in trading for your Blue-Eyes White Dragon. I can offer..."
                          value={tradeMessage}
                          onChange={(e) => setTradeMessage(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSubmitOffer}>
                        Send Trade Offer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No traders found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
