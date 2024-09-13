/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  journalDefault,
  journalFields,
  journalFormSchema,
} from './form/formSchema';
import useToasts from '@/hooks/useToasts';
import { useState } from 'react';

// Inport ShadCN Form Components
import { Button } from '@/gui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/gui/components/ui/form';
import { Input } from '@/gui/components/ui/input';
import { Textarea } from '../ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/gui/components/ui/select';

import { Calendar } from '@/gui/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/gui/components/ui/popover';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';
import { ServerURL } from '@/lib/SERVERURL';

/**
 * Create Journal Component
 * @returns JSX Component
 */
type TCreateComp = {
  closeModal: () => void;
  setReload: React.Dispatch<React.SetStateAction<number>>;
};

type TExtra = {
  location: string;
  health: string;
  dateAcquired: Date | undefined;
};

const CreateJournal: React.FC<TCreateComp> = ({ closeModal, setReload }) => {
  const { toastSuccess, toastError } = useToasts();
  const [screen, setScreen] = useState(1);
  const [extra, setExtra] = useState<TExtra>({
    location: '',
    health: '',
    dateAcquired: undefined,
  });

  const form = useForm<z.infer<typeof journalFormSchema>>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: journalDefault,
  });

  // Submit Form values
  async function onSubmit(values: z.infer<typeof journalFormSchema>) {
    const fullData = { ...values, ...extra };
    try {
      const res = await axios.post(
        `${ServerURL}/user/journal/create`,
        fullData
      );

      const data = res.data;
      console.log('DATA: ', data);

      toastSuccess('Form Submitted!!');
      setReload((prev) => ++prev);

      // Handle Error
    } catch (error: any) {
      if (error.response) {
        toastError(error.response.data.message || error.message);
      }

      toastError('A network error occured. Try again.');
    } finally {
      closeModal();
    }
  }

  //   Return Form JSX
  return (
    <div className="scrollbar-thin max-h-[90%] w-full max-w-[500px] animate-fadein overflow-y-auto rounded-lg bg-white p-5 px-8">
      {/* Header of the form */}
      <div className="my-5 text-center">
        <h2 className="text-2xl font-semibold text-primary-green">
          Create New Journal Entry
        </h2>
        <p className="text-xs">
          Start a new story to document your plant activity.
        </p>
      </div>

      {/* Form Component */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 font-poppins"
        >
          {/* Render Screen One of the Form */}
          {screen === 1 && (
            <>
              {journalFields.map((formfield, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={formfield.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formfield.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={formfield.placeholder}
                          {...field}
                          className="p-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setScreen(2)}
                  className="w-full p-6"
                >
                  Next
                </Button>
                <Button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-400 p-6"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}

          {/* Render Screen Two */}

          {screen === 2 && (
            <>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a descriptive text for your users to see. This will be on the scheduling page."
                        className="h-[190px] resize-none text-[15px] sm:text-[16px]"
                        style={{ padding: '1.4rem' }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Location of the PLant */}
              <Select
                value={extra.location}
                onValueChange={(value) =>
                  setExtra((prev) => ({ ...prev, location: value }))
                }
              >
                <SelectTrigger className="w-full p-6">
                  <SelectValue placeholder="Pick a Location of the Plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indoor">Indoor</SelectItem>
                  <SelectItem value="Outdoor">Outdoor</SelectItem>
                  <SelectItem value="Greenhouse">Greenhouse</SelectItem>
                  <SelectItem value="Farmland">Farmland</SelectItem>
                </SelectContent>
              </Select>

              {/* Select Health of the Plant */}
              <Select
                value={extra.health}
                onValueChange={(value) =>
                  setExtra((prev) => ({ ...prev, health: value }))
                }
              >
                <SelectTrigger className="w-full p-6">
                  <SelectValue placeholder="What is the health of the plant?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Picker */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={`w-full p-6 justify-start text-left font-normal ${
                      !extra.dateAcquired && 'text-muted-foreground'
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {extra.dateAcquired ? (
                      format(extra.dateAcquired, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={extra.dateAcquired}
                    onSelect={(day) =>
                      setExtra((prev) => ({ ...prev, dateAcquired: day }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Complete and Cancel Button */}
              <div className="flex gap-3">
                <Button type="submit" className="w-full bg-primary-green p-6">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => setScreen(1)}
                  className="bg-primary-orange p-6"
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateJournal;
