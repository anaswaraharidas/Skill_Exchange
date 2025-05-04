import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { MOCK_SKILLS, MOCK_USERS } from "@/lib/types";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CATEGORIES } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(3, "Skill name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Please describe what you want to learn").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LearningSkill {
  name: string;
  category: string;
  description: string;
  provider: string;
  matchStatus: "pending" | "matched" | "scheduled";
}

interface AddLearningFormProps {
  open: boolean;
  onClose: () => void;
  onAddLearning: (skill: LearningSkill) => void;
}

const AddLearningForm = ({ open, onClose, onAddLearning }: AddLearningFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });

  const findTeacherForSkill = (skillName: string, category: string) => {
    // First, try to find an exact match in MOCK_SKILLS
    const matchingSkill = MOCK_SKILLS.find(s => 
      s.title.toLowerCase() === skillName.toLowerCase() ||
      s.category.toLowerCase() === category.toLowerCase()
    );

    if (matchingSkill) {
      return matchingSkill.owner;
    }

    // If no exact match, look for partial matches in skills
    const partialMatchSkills = MOCK_SKILLS.filter(s => 
      s.title.toLowerCase().includes(skillName.toLowerCase()) ||
      s.category.toLowerCase().includes(category.toLowerCase())
    );

    if (partialMatchSkills.length > 0) {
      // Return the owner of the highest rated matching skill
      const highestRatedSkill = partialMatchSkills.reduce((prev, current) => 
        (prev.rating || 0) > (current.rating || 0) ? prev : current
      );
      return highestRatedSkill.owner;
    }

    // If no skill matches, look for teachers with matching skills
    const availableTeachers = MOCK_USERS.filter(user => 
      user.skills?.some(s => 
        s.toLowerCase().includes(skillName.toLowerCase()) ||
        s.toLowerCase().includes(category.toLowerCase())
      )
    );

    if (availableTeachers.length > 0) {
      // Return the most experienced teacher (based on creation date)
      return availableTeachers.reduce((prev, current) => 
        prev.createdAt < current.createdAt ? prev : current
      );
    }

    // If still no match, return a random teacher
    return MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const teacher = findTeacherForSkill(data.name, data.category);
      
      const newLearning: LearningSkill = {
        name: data.name,
        category: data.category,
        description: data.description,
        provider: teacher.name,
        matchStatus: "matched" as const
      };
      
      onAddLearning(newLearning);
      toast.success("Learning request added! We've found you a teacher.");
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error adding learning skill:", error);
      toast.error("Failed to add learning request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryTypes = ['technical', 'cultural', 'creative', 'business', 'lifestyle'];
  const groupedCategories = categoryTypes.reduce((acc, type) => {
    acc[type] = CATEGORIES.filter(cat => cat.type === type);
    return acc;
  }, {} as Record<string, typeof CATEGORIES>);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-primary-blue via-primary-violet to-primary-orange bg-clip-text text-transparent">
            Request to Learn a Skill
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill I Want to Learn</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Spanish Language, Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Accordion type="single" collapsible className="w-full">
                    {categoryTypes.map((type) => (
                      <AccordionItem key={type} value={type}>
                        <AccordionTrigger className="capitalize">
                          {type} Skills
                        </AccordionTrigger>
                        <AccordionContent>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={`Select a ${type} skill`} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {groupedCategories[type].map((category) => (
                                <SelectItem key={category.id} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want to learn?</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Tell us specifically what you want to learn" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This helps us match you with the right teacher
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary-blue via-primary-violet to-primary-orange text-white hover:opacity-90"
              >
                {isSubmitting ? "Submitting..." : "Find Me a Teacher"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLearningForm;
