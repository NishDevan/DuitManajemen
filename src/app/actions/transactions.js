'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTransaction(data) {
  try {
    if (!data.userId) {
      return { success: false, error: "User ID tidak ditemukan. Pastikan Anda sudah login." };
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: data.amount,
        type: data.type,
        category: data.category,
        description: data.description,
        date: data.date,
        userId: data.userId, 
      }
    });

    revalidatePath('/'); 
    return { success: true, data: newTransaction };
  } catch (error) {
    console.error("Error createTransaction:", error);
    return { success: false, error: error.message };
  }
}

export async function getFinancialSummary(userId) {
  if (!userId) return { success: true, data: { balance: 0, totalIncome: 0, totalExpense: 0 } };
  
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: userId },
    });
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(t => {
      if (t.type === 'INCOME') totalIncome += t.amount;
      if (t.type === 'EXPENSE') totalExpense += t.amount;
    });
    
    return {
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      }
    };
  } catch (error) {
    console.error("Error getFinancialSummary:", error);
    return { success: false, error: error.message };
  }
}

export async function getRecentTransactions(userId) {
  if (!userId) return { success: true, data: [] };
  
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' },
      take: 5, 
    });
    
    return {
      success: true,
      data: transactions
    };
  } catch (error) {
    console.error("Error getRecentTransactions:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTransaction(transactionId) {
  try {
    await prisma.transaction.delete({
      where: { id: transactionId },
    });
    
    revalidatePath('/'); 
    return { success: true };
  } catch (error) {
    console.error("Error deleteTransaction:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTransaction(transactionId, data) {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        amount: data.amount,
        type: data.type,
        category: data.category,
        description: data.description,
        date: data.date,
      }
    });

    revalidatePath('/'); 
    return { success: true, data: updatedTransaction };
  } catch (error) {
    console.error("Error updateTransaction:", error);
    return { success: false, error: error.message };
  }
}